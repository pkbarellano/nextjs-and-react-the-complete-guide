/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'kevinbuaga-nextjs-demo-users-image.s3.ap-southeast-2.amazonaws.com',
                port: '',
                pathname: '/**'
            }
        ]
    }
}

module.exports = nextConfig
