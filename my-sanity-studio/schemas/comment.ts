--- START OF FILE schemas/comment.ts ---
import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'comment',
  title: 'Comment',
  type: 'document',
  fields: [
    defineField({
      name: 'authorName',
      title: 'Author Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'authorEmail',
      title: 'Author Email',
      type: 'string', // Stored for Gravatar or contact, not publicly displayed
    }),
    defineField({
      name: 'commentText',
      title: 'Comment',
      type: 'text',
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'post',
      title: 'Post',
      type: 'reference',
      to: [{ type: 'post' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'approved',
      title: 'Approved',
      type: 'boolean',
      description: 'Comments must be approved before they are visible on the site.',
      initialValue: false, // Default to not approved
    }),
    defineField({
      name: '_createdAt',
      title: 'Created At',
      type: 'datetime',
      readOnly: true, // Auto-set by function
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
        timeStep: 15,
        calendarTodayLabel: 'Today',
      },
    }),
  ],
  preview: {
    select: {
      title: 'authorName',
      subtitle: 'commentText',
      postTitle: 'post.title',
      approved: 'approved',
    },
    prepare({ title, subtitle, postTitle, approved }) {
      return {
        title: `${title} on ${postTitle || 'N/A'}`,
        subtitle: subtitle,
        media: approved ? undefined : (
          <span style={{ fontSize: '1.5em' }} role="img" aria-label="Not Approved">🚫</span>
        ), // Visual indicator for unapproved
      };
    },
  },
});
--- END OF FILE schemas/comment.ts ---