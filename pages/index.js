import Layout from "../components/Layout";

export default function Home() {
    const angular_link = 'https://skill-assess-api.vercel.app/api/questions/angular'

    return (
    <div>
        <Layout />
        <h1>Try visiting <a href={angular_link}>Angular</a> to get the json data.</h1>
    </div>
  )
}
