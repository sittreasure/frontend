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
  line-height: 27px;
  color: #C4C4C4;
`

const Idel = styled.div`
  display: flex;
  align-items: center;
  width: ${props => (props.dept * 17) + 17}px;
  height: 9px;
`

const Icon = styled.img`
  width: 17px;
  height: 19px;
  margin-right: 10px;
`

const OverlayBackground = styled.div`
  display: ${props => props.show ? 'block' : 'none'};
  position: absolute;
  z-index: 200;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
`

const PopupContainer = styled.div`
  display: ${props => props.show ? 'flex' : 'none'};
  flex: 1;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 201;
  width: 100%;
  height: 100%;
  background-color: transparent;
`

const PopupBox = styled.div`
  display: flex;
  flex-direction: column;
  width: ${props => props.width};
  height: auto;
  background-color: #24282A;
`

const PopupHeader = styled(Title)`
  font-size: 23px;
  line-height: 30px;

  display: flex;
  align-items: center;
  padding-left: 16px;
  color: #61D0FF;
  background-color: #1B1D1F;
`

const PopupBody = styled.div`
  margin-top: 19px;
  margin-bottom: 15px;
  padding: 0px 16px;
`

const NameContainer = styled.div`
  display: flex;
`

const Label = styled(Title)`
  font-size: 23px;
  line-height: 30px;
  margin: 0px 17px;
`

const InputContainer = styled(Title)`
  width: 100%;
  height: 44px;
  position: relative;
  top: 4px;
`

const Input = styled.input`
  width: 100%;
  height: 22px;
  font-family: "ThaiSans Neue";
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 26px;
  color: #8F9192;
  background-color: transparent;
  padding-left: 10px;
  border: 1px solid #C4C4C4;
  box-sizing: border-box;
  border-radius: 3px;

  &:invalid {
    border: 1px solid #EC172C;
  }

  &::placeholder {
    font-style: italic;
    font-weight: 600;
    font-size: 20px;
    line-height: 26px;
    color: rgba(93, 93, 93, 0.7);
  }
`

const InputError = styled.div`
  display: none;
  width: 100%;
  height: 22px;
  font-size: 17px;
  line-height: 22px;
  color: #EC172C;
  position: relative;
  top: -1px;

  ${Input}:invalid + & {
    display: block;
  }
`

const PopupFooter = styled(Title)`
  display: flex;
  justify-content: flex-end;
  padding-right: 16px;
  padding-bottom: 14px;
`

const Button = styled.button`
  display: flex;
  justify-content: center;
  width: 64px;
  height: 25px;
  color: ${props => props.disable ? '#141414' : '#C4C4C4'};
  background-color: transparent;
  border: 1px solid ${props => props.yes ? '#75FF00' : '#EC172C'};
  box-sizing: border-box;
  border-radius: 3px;
  opacity: ${props => props.disable ? 0.45 : 1};
  margin-left: 9px;
  cursor: ${props => props.disable ? 'not-allowed' : 'pointer'};

  &::after {
    content: '${props => props.yes ? 'OK' : 'Cancel'}';
  }
`

const styleds = {
  TitleWrapper,
  Title,
  Idel,
  Icon,
  OverlayBackground,
  PopupContainer,
  PopupBox,
  PopupHeader,
  PopupBody,
  NameContainer,
  Label,
  InputContainer,
  Input,
  InputError,
  PopupFooter,
  Button,
}

export default styleds
