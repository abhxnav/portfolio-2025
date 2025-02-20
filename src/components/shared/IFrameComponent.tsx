interface IFrameComponentProps {
  src: string
  title: string
}

const IframeComponent = ({ src, title }: IFrameComponentProps) => {
  return (
    <iframe
      src={src}
      title={title}
      style={{
        width: '100%',
        height: '100%',
        border: 'none',
      }}
    />
  )
}

export default IframeComponent
