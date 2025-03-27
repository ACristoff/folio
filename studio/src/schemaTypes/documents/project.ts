import { defineField, defineType } from "sanity";
// import {DocumentTextIcon} from '@sanity/icons'
import {TerminalIcon} from '@sanity/icons'
import {format, parseISO} from 'date-fns'

// /**
//  * Post schema.  Define and edit the fields for the 'post' content type.
//  * Learn more: https://www.sanity.io/docs/schema-types
//  */

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: TerminalIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Project Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'person'}],
    }),
    defineField({
      title: 'Slug',
      name: 'slug',
      description: 'A slug is required for the post to show up in the preview',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'screenshots',
      title: 'Screenshots',
      type: 'array',
      of: [
        {
          type: 'image',
          fields: [
            {
              name: 'alt',
              type: 'string',
              description: 'Important for SEO and accessibility.'
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
        aiAssist: {
          imageDescriptionField: 'alt',
        },
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
          validation: (rule) => {
            // Custom validation to ensure alt text is provided if the image is present. https://www.sanity.io/docs/validation
            return rule.custom((alt, context) => {
              if ((context.document?.coverImage as any)?.asset?._ref && !alt) {
                return 'Required'
              }
              return true
            })
          },
        },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      description: 'Project type, intent, tech stack, unique hooks',
      type: 'blockContent',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      description: 'For SEO Metadata about this project',
      type: 'text',
    }),
    defineField({
      title: 'Project URL',
      description: 'Github repo',
      name: 'repoURL',
      placeholder: 'https://github.com/ACristoff/*',
      type: 'url',
    }),
    defineField({
      title: 'Demo URL',
      name: 'demoURL',
      description: 'Place where the user can go to check it out',
      placeholder: 'https://url.com/',
      type: 'url',
    }),
    defineField({
      title: 'Related Posts',
      name:  'related',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {type: 'post'}
          ]
        }
      ]
    }),
  ]
})



// export const post = defineType({
//   // List preview configuration. https://www.sanity.io/docs/previews-list-views
//   preview: {
//     select: {
//       title: 'title',
//       authorFirstName: 'author.firstName',
//       authorLastName: 'author.lastName',
//       date: 'date',
//       media: 'coverImage',
//     },
//     prepare({title, media, authorFirstName, authorLastName, date}) {
//       const subtitles = [
//         authorFirstName && authorLastName && `by ${authorFirstName} ${authorLastName}`,
//         date && `on ${format(parseISO(date), 'LLL d, yyyy')}`,
//       ].filter(Boolean)

//       return {title, media, subtitle: subtitles.join(' ')}
//     },
//   },
// })
