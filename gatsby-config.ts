import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  pathPrefix: '/',
  siteMetadata: {
    title: `Mario Howard Keramik`,
    siteUrl: `https://mario-howard.de`,
    description: `Einzigartige Keramik von Mario Howard aus eigener Keramikwerkstatt in Dippelsdorf bei Moritzburg.`
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: ["gatsby-plugin-image", {
    resolve: 'gatsby-plugin-manifest',
    options: {
      "icon": "src/images/icon.png"
    }
  },
  "gatsby-plugin-sharp", 
  "gatsby-transformer-sharp", {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "images",
      "path": "./src/images/"
    },
    __key: "images"
  },
  {
			resolve: '@directus/gatsby-source-directus',
			options: {
				url: `http://188.34.200.119:8055`, // Fill with your Directus instance address
				/* auth: {
					token: 'my_secret_token', // You can use a static token from an user

					// Or you can use the credentials of an user
					// email: "johndoe@directus.cloud",
					// password: "mysecretpassword",
				},*/
			},
		},
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        excludes: ['/imprint', '/datenschutz'],
      },
    }
  ]
};

export default config;
