import request from '../helpers/request'
import { Api } from '../interfaces/common'

export interface ResUser {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  site_admin: boolean
}

export interface ParamsUserList {
  since: number
  per_page: number
}

export interface ResUserList {
  data: ResUser[]
}

export const initResUserList = {
  data: [],
}

export interface ResUserDetail {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  site_admin: boolean
  name: string
  company: string
  blog: string
  location: string
  email: string | null
  hireable: string | null
  bio: string | null
  twitter_username: string
  public_repos: number
  public_gists: number
  followers: number
  following: number
  created_at: string
  updated_at: string
}

export const initResUserDetail = {
  login: '',
  id: -1,
  node_id: '',
  avatar_url: '',
  gravatar_id: '',
  url: '',
  html_url: '',
  followers_url: '',
  following_url: '',
  gists_url: '',
  starred_url: '',
  subscriptions_url: '',
  organizations_url: '',
  repos_url: '',
  events_url: '',
  received_events_url: '',
  type: '',
  site_admin: false,
  name: '',
  company: '',
  blog: '',
  location: '',
  email: null,
  hireable: null,
  bio: null,
  twitter_username: '',
  public_repos: -1,
  public_gists: -1,
  followers: -1,
  following: -1,
  created_at: '',
  updated_at: '',
}

export const getUserList: Api<ParamsUserList, ResUser[]> = (query) =>
  request({
    url: '/users',
    method: 'GET',
    params: query,
  })

export const getUserDetail: Api<string, ResUserDetail> = (query) =>
  request({
    url: `/users/${query}`,
    method: 'GET',
  })
