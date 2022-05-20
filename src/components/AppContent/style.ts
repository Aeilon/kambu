import styled from "styled-components";

export const Main = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: calc(100vh - 58px);

  @media (max-width: 1150px) {
    flex-direction: column;
    height: unset;
  }
`;

export const LeftSide = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.white};
  padding: 50px 100px;
  gap: 50px;
  overflow-y: auto;

  @media (max-width: 1150px) {
    width: 100%;
    padding: 50px 100px;
    overflow-y: unset;
  }

  @media (max-width: 700px) {
    padding: 50px 25px;
  }

  p {
    ${({ theme }) => theme.typography.p.large}
  }
`;

export const RightSide = styled(LeftSide)`
  background: ${({ theme }) => theme.colors.gray};
  padding: 50px 50px;

  @media (max-width: 1150px) {
    padding: 50px 100px;
  }

  @media (max-width: 700px) {
    padding: 50px 25px;
  }
`;

export const Button = styled.button`
  height: 40px;
  color: ${({ theme }) => theme.colors.white};
  background: ${({ theme }) => theme.colors.blue};
  ${({ theme }) => theme.typography.p.medium}
  transition: all 0.1s ease-in-out;
  border: none;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.lightBlue};
    transition: all 0.1s ease-in-out;
  }
`;

export const Input = styled.input`
  height: 40px;
  padding: 0 20px;
  ${({ theme }) => theme.typography.p.medium}
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  ${({ theme }) => theme.typography.p.small}
  text-align: left;

  img {
    cursor: pointer;
  }

  td,
  th {
    border-right: 1px solid;
    border-color: ${({ theme }) => theme.colors.lightGray};
    padding: 10px 40px;

    &:first-child {
      padding-left: 0;
    }

    &:last-child {
      border-right: none;
      display: flex;
      justify-content: space-between;
    }
  }

  thead,
  th {
    font-size: 15px;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.lightBlue};
  }

  tfoot {
    ${({ theme }) => theme.typography.p.medium}
    ${({ theme }) => theme.colors.black};
    font-weight: 700;
  }
`;

export const LargestAmmountBox = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: space-between;
  gap: 10px;

  p {
    ${({ theme }) => theme.typography.p.medium}
    color:${({ theme }) => theme.colors.lightBlue};
  }

  div {
    display: flex;
    justify-content: space-between;

    &:first-child {
      p {
        :first-child {
          color: ${({ theme }) => theme.colors.black};
        }
      }
    }

    &:last-child {
      justify-content: flex-end;
    }
  }
`;
