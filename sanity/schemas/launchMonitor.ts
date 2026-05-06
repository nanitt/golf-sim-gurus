import { defineField, defineType } from "sanity";

export const launchMonitor = defineType({
  name: "launchMonitor",
  title: "Launch Monitor",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "price",
      title: "Starting Price",
      type: "string",
    }),
    defineField({
      name: "accuracy",
      title: "Accuracy",
      type: "string",
    }),
    defineField({
      name: "ballSpeed",
      title: "Ball Speed",
      type: "string",
    }),
    defineField({
      name: "clubData",
      title: "Club Data",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "outdoorCapable",
      title: "Outdoor Capable",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "technology",
      title: "Technology",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "recommendation",
      title: "Recommendation",
      type: "text",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "price", media: "image" },
  },
});
