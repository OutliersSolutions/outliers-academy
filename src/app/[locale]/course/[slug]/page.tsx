import { redirect } from 'next/navigation';

export default async function CoursePage({
  params
}: {
  params: { slug: string; locale: string }
}) {
  // Redirect to the overview page
  redirect(`/${params.locale}/course/${params.slug}/overview`);
}