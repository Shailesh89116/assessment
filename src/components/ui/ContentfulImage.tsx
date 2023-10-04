import Image from 'next/image'

interface LoaderProps{
    src : any,
    width : any,
    quality : any
}

interface contentfulImageProps{
    props : any
}

const contentfulLoader : React.FC<LoaderProps> = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`
}

const ContentfulImage  = (props : any) => {
  // eslint-disable-next-line jsx-a11y/alt-text
  return <Image loader={contentfulLoader} {...props} />
}

export default ContentfulImage