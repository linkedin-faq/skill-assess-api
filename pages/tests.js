import Layout from "../components/Layout";
import {useState} from 'react'
// import {getAllSkillNames} from "../lib/skills";

import useSWR from 'swr'
import { gql } from 'graphql-request'
import { graphQLClient } from '../lib/graphql-client'

const fetcher = async (query) => await graphQLClient().request(query)

export default function Home() {
    const { data, error } = useSWR(
        gql`
          {
            allTests {
              data {
                _id
                topic
              }
            }
          }
        `,
        fetcher
      );

    if (error) {
        console.log(graphQLClient())
        console.log(error.message)
        return <div> Failed to load </div>
    }

    return (
        <div>
            <Layout />
            <h1>This page will show users test soon</h1>

        </div>
      )
}

  