import Layout from "../components/Layout";
import {useState, useEffect} from 'react'
import ListOfSkills from "../components/ListOfSkills";

export default function Home() {
    const [allSkills, setAllSkills] = useState([])
    const [skills, setSkills] = useState([])

    useEffect(() => {
        if (skills.toString() == "") {
            fetch('/api/questions/')
                .then(response => response.text())
                .then(data => {
                    setSkills(JSON.parse(data))
                    setAllSkills(JSON.parse(data))
                })
        }
    })

    const search = (e) => {
        const filter = e.target.value
        const filterRegExp = new RegExp(`${filter}`, 'i')
        const skills = allSkills.filter((item) => item.match(filterRegExp))
        setSkills(skills)
    }

    return (
        <div>
            <Layout />
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
