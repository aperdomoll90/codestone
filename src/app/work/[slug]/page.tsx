import { getProjectBySlug, getAllProjectSlugs } from '../../data/projects'
import ProjectContent from './ProjectContent'

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }))
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug)
  return <ProjectContent project={project} />
}
