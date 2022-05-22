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

export const Input = styled.input`
  height: 40px;
  padding: 0 20px;
  ${({ theme }) => theme.typography.p.medium}
`;
