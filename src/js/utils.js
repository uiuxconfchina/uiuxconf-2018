import $ from 'jquery'
import {stripIndent} from 'common-tags'

export const getElemInScope = (scope) => (el) => $(`${scope} ${el}`)

export const formatSponsorPayload = (data) => (
  {
    title: `Sponsor Application from ${data.name}`,
    body: stripIndent`
      Contact Name: **${data.name}**
      Company Name: **${data.company}**
      Email: **${data.email}**
      Phone Number: **${data.phone}**
      Sponsor Level: **${data.sponsorLevel}**
      Questions / Comments: **${data.comments}**
    `,
    label: 'SPONSOR APPLICATION',
  }
)

export const formatSpeakerPayload = (data) => (
  {
    title: `Speaker Application from ${data.name}`,
    body: stripIndent`
      ## Personal Info

      - Full Name: **${data.name}**
      - Current Based City: **${data.city}**
      - Email: **${data.email}**
      - Title: **${data.title}**
      - mobile: **${data.mobile}**
      - A Short Bio: **${data.bio}**
      - Social Media: **${data.social}**
      - Reason to apply: **${data.reason}**
      ![Headshot](${data.headshot})

      ## About Talk

      - Topic: **${data.topic}**
      - Description: **${data.desc}**
      - Links of previous public talks: **${data.talks}**
      - Will be sponsored by the company: **${data.sponsored}**
      - The prefer type of presentation: **${data.preference}**
    `,
    label: 'SPEAKER APPLICATION',
  }
)

export const formatMediaPayload = (data) => (
  {
    title: `Media Application from ${data.name}`,
    body: stripIndent`
      Name: **${data.name}**
      Organization: **${data.organization}**
      Email: **${data.email}**
      Mobile: **${data.mobile}**
    `,
    label: 'MEDIA APPLICATION',
  }
)
