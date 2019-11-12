 async function feed(parent, args, context, info) {
    // set up the filter
    const where = args.filter ? {
        OR: [
            { description_contains: args.filter },
            { url_contains: args.filter }
        ]
    } : {} // if no filter is provided we will set as empty object

    //set up links with the filter
    const links = await context.prisma.links({
        where
    })

    return links
  }
  
  module.exports = {
    feed,
  }
  