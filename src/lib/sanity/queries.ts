export const galleryQuery = `*[_type == "gallery"] | order(_createdAt desc) {
  _id,
  title,
  "slug": slug.current,
  image,
  roomWidth,
  roomDepth,
  ceilingHeight,
  launchMonitor,
  description,
  featured
}`;

export const featuredGalleryQuery = `*[_type == "gallery" && featured == true] | order(_createdAt desc) [0...8] {
  _id,
  title,
  "slug": slug.current,
  image,
  roomWidth,
  roomDepth,
  ceilingHeight,
  launchMonitor,
  description,
  featured
}`;

export const testimonialsQuery = `*[_type == "testimonial"] | order(_createdAt desc) [0...3] {
  _id,
  name,
  location,
  quote,
  image,
  roomImage
}`;

export const equipmentQuery = `*[_type == "launchMonitor"] | order(name asc) {
  _id,
  name,
  "slug": slug.current,
  image,
  price,
  accuracy,
  ballSpeed,
  clubData,
  outdoorCapable,
  technology,
  description,
  recommendation
}`;
