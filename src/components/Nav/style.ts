import styled from "styled-components";

export const Main = styled.div`
  width: 100%;
  min-height: 58px;
  background: ${({ theme }) => theme.colors.blue};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 100px;

  @media (max-width: 700px) {
    padding: 0 25px;
  }

  img {
    user-select: none;
  }

  p {
    color: ${({ theme }) => theme.colors.white};
    ${({ theme }) => theme.typography.p.large}
  }
`;
