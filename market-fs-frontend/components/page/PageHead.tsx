import Head from "next/head";

export interface PageHeadProps {
  title: string;
}

export function PageHead({ title }: PageHeadProps) {
  return (
    <Head>
      <meta name="keywords" content=""></meta>
      <meta
        name="description"
        content="Punch that cute thing for the fun of it."
      ></meta>
      <meta httpEquiv="refresh" content="30"></meta>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      ></meta>
      <title>{title}</title>
    </Head>
  );
}
