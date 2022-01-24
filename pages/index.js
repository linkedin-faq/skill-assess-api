import Layout from "../components/Layout";
import {useState} from 'react'
import ListOfSkills from "../components/ListOfSkills";
import {getAllSkillNames} from "../lib/skills";

export default function Home(props) {
    const { skillNames } = props;
    const [allSkills] = useState(skillNames);
    const [skills, setSkills] = useState(skillNames)


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
                        className="form-control mr-sm-2 mt-2"
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



export async function getServerSideProps() {

    const skillNames = await getAllSkillNames()
  
    return {
      props: { skillNames },
    };
  }
  