import { useCookies } from "react-cookie";
import {query as q} from 'faunadb';
import {client} from '../lib/client';
import { sanitized } from '../lib/skills';
import { gql } from 'graphql-request'
import { graphQLClient } from "../lib/client";

export default function SkillCard(skill, key) {
    const [cookie] = useCookies(["guestUserId"])

	const exam = async () => {

		// get random 10 questions by topic
		const response = await client.query(
			q.Call(q.Function("get_random_questions"), sanitized(skill.skill))
		)

		// select question ids from question refs
		const question_ids = response.map(ref => ref.id)

		// generate Test with candidate GuestUser
		const query = gql`
			mutation CreateATest($skill: String!, $question_refs: [ID!], $candidate: ID!) {
				createTest(
				    data: {
				      topic: $skill,
				      asks: { connect: $question_refs },
					  candidate: { connect: $candidate },
					  submitted: false
				    }
				  ) {
				    _id
				  }
			}
		`;

		const test = await graphQLClient(cookie.authToken).request(query, { skill: sanitized(skill.skill), question_refs: question_ids, candidate: cookie.guestUserId })
	}

    return (
        <div className="card col-4 m-4" style={{width: '18rem'}} key={key}>
                <div className="card-body">
                    <h5 className="card-title">{skill.skill}</h5>
                    <a className="btn btn-primary" href={'/quizes/'+encodeURIComponent(skill.skill)}>Test</a>
                    <button className="btn btn-secondary" onClick={exam}>Exam</button>
                </div>
        </div>
    )
}