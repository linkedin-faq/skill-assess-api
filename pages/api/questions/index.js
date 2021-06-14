import NextCors from "nextjs-cors"

export default async(req, res) => {
    await NextCors(req, res, {
        // Options
        methods: ['GET'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });

    try {
        await fetch('https://skill-assess-api.vercel.app/api/questions/skill_names')
            .then(response => res.status(200).json(response.body) )
    } catch(e) {
        console.log(e)
        res.status(500).json({error: e.message})
    }
}