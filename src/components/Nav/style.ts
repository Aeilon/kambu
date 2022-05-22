import styled from "styled-components";

export const Main = styled.div`
  width: 100%;
  min-height: 58px;
  background: ${({ theme }) => theme.colors.blue};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 100px;

  @media (max-width: 840px) {
    padding: 0 25px;
  }

  @media (max-width: 680px) {
    min-height: 100px;
  }

  @media (max-width: 595px) {
    flex-direction: column;
    padding: 10px 25px;
    gap: 20px;
    height: auto;
    min-height: unset;
  }

  img {
    user-select: none;
  }

  p {
    color: ${({ theme }) => theme.colors.white};
    ${({ theme }) => theme.typography.p.large}
  }
`;
