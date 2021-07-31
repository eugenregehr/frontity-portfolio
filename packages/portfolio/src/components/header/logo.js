import { connect, styled } from 'frontity';

const Logo = () => {
  return (
    <LogoWrap className={className}>

      <div className={"top-left"} />
      <div className={"top-right"} />
      <div className={"middle-left"} />
      <div className={"middle-right"} />
      <div className={"bottom-right"} />
      <div className={"bottom-left"} />
    </LogoWrap>
  )
}

export default connect(Logo);
const LogoWrap = styled.div`
`