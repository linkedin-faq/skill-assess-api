import Layout from "../components/Layout";
import { useState, useEffect } from 'react'
import ListOfSkills from "../components/ListOfSkills";
import {getAllSkillNames} from "../lib/skills";
import {query as q} from 'faunadb';
import { useCookies } from "react-cookie";
import { client } from '../lib/client';

// get all methods with spread operator
const { Let, Select, Create, Collection, Tokens, Var, Update, Paginate, Match, Index } = q

export default function Home(props) {
    const { skillNames } = props;
    const [allSkills] = useState(skillNames);
    const [skills, setSkills] = useState(skillNames)
    const [guestUserId, setGuestUserId] = useState('')

    const [cookie, setCookie, removeCookie] = useCookies(["guetUserToken"])

    useEffect(async () => {
            if (cookie.guestUserToken === undefined) {
                try {
                    // make request to faunadb to create new token
                    const response = await client.query(
                            Let(
                                {
                                    // create a new guestUser
                                    ref: Select("ref", Create(Collection("GuestUser"))),
                                    token: Select("secret", Create(Tokens(), { instance: Var("ref") }))
                                },
                                Update(Var("ref"), { data: { token: Var("token") } })
                            )
                        )

                    console.log(response)

                    // save the token associated with guest User in the cookie
                    setCookie("guestUserToken", response.data.token)
                } catch(error) {
                    console.log(error)
                }
            } else {
                // [TODO]: following code needs to execute even if guest User is freshly created
                // then we have token to access the guest User
                try {
                    // make request to faunadb to get the guest user ref
                    const response = await client.query(
                        Select("data",
                            Paginate(
                                Match(
                                        Index("guest_user_by_token"),
                                        cookie.guestUserToken
                                    )
                                )
                            )
                    )

                    console.log(response[0].id)
                    setGuestUserId(response[0].id)
                    setCookie("guestUserId", response[0].id)
                } catch(error) {
                    console.log(error)
                }
            }
    }, [])


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
  