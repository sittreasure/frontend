import styled from 'styled-components'

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 36px;
  cursor: pointer;
`

const Title = styled.div`
  font-family: "ThaiSans Neue";
  font-style: normal;
  font-weight: bold;
  font-size: 21px;
  line-height: normal;
  color: #C4C4C4;
`

const Idel = styled.div`
  width: ${props => (props.dept * 17) + 17}px;
  height: 1px;
`

const Icon = styled.img`
  width: 17px;
  height: 19px;
  margin-right: 10px;
`

const styleds = {
  TitleWrapper,
  Title,
  Idel,
  Icon,
}

export default styleds
