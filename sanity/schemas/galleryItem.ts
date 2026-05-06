import { defineField, defineType } from "sanity";

export const galleryItem = defineType({
  name: "gallery",
  title: "Gallery Item",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "roomWidth",
      title: "Room Width",
      type: "string",
    }),
    defineField({
      name: "roomDepth",
      title: "Room Depth",
      type: "string",
    }),
    defineField({
      name: "ceilingHeight",
      title: "Ceiling Height",
      type: "string",
    }),
    defineField({
      name: "launchMonitor",
      title: "Launch Monitor",
      type: "string",
      options: {
        list: [
          { title: "Trackman iO", value: "Trackman iO" },
          { title: "Foresight GCQuad", value: "Foresight GCQuad" },
          { title: "Uneekor EYE XO2", value: "Uneekor EYE XO2" },
        ],
      },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "title", media: "image" },
  },
});
