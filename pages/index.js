import Layout from "../components/Layout";
import {useState, useEffect} from 'react'
import ListOfSkills from "../components/ListOfSkills";
import {getAllSkillNames} from "../lib/skills";

export default function Home() {
    const [allSkills, setAllSkills] = useState([])
    const [skills, setSkills] = useState([])
    const [randomQuestion, setRandomQuestion] = useState(false)

    useEffect(async () => {
        if (skills.toString() == "") {
            const skillNames = await getAllSkillNames()
            setSkills(skillNames)
            setAllSkills(skillNames)
        }
    })

    const search = (e) => {
        const filter = e.target.value
        const filterRegExp = new RegExp(`${filter}`, 'i')
        const skills = allSkills.filter((item) => item.match(filterRegExp))
        setSkills(skills)
    }

    const toggleRandomQuestion = () => {
        setRandomQuestion(!randomQuestion)
        console.log("triggerd", randomQuestion)
    }

    return (
        <div>
            <Layout toggleRandomQuestion={toggleRandomQuestion}/>
            <div className={'container'}>
                <form className="form-inline my-3 my-lg-0">
                    <input
                        className="form-control mr-sm-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        onKeyUp={(e) => search(e)}
                    />
                </form>

                { (skills.length > 0) ? (<div className={'container'}>

                    <ListOfSkills skills={skills}/>
                </div>) : (<h1>SKILLS LOADING</h1>) }
            </div>

        </div>
      )
}
