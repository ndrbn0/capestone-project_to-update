import { useRouter } from "next/router";
import ingredients from "@/assets/ingredients.json";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

const IngredientDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const ingredient = ingredients.find((item) => item._id === id);

  const flavorColors = {
    Bitter: "#D2691E",
    Creamy: "#FFFACD",
    Fresh: "#98FB98",
    Herbal: "#228B22",
    Pungent: "#FF6347",
    Salty: "#F0E68C",
    Savory: "#D2B48C",
    Spicy: "#cf2210",
    Sour: "#d9df0c",
    Sweet: "#FFB6C1",
    Tangy: "#FFA07A",
    Umami: "#188989",
  };

  if (!ingredient) {
    return <div>Loading...</div>;
  }

  return (
    <PageContainer>
      <Container>
        <BackLink href="/">
          <ArrowIcon />
          Back
        </BackLink>
        <Content>
          <ImageWrapper>
            <StyledImage
              src={ingredient.imgUrl}
              layout="responsive"
              width={600}
              height={400}
              alt={ingredient.name}
            />
          </ImageWrapper>
          <Details $color={flavorColors[ingredient.flavor]}>
            <Name>{ingredient.name}</Name>
            <Flavor>#{ingredient.flavor}</Flavor>
          </Details>
        </Content>
      </Container>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const Container = styled.div`
  width: 600px;
  height: 680px;
  margin: 0 auto; /* Center horizontally */
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  position: relative;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  }
`;

const BackLink = styled(Link)`
  text-decoration: none;
  color: #000;
  font-weight: bold;
  margin-left: 10px;
  margin-top: 10px;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
`;

const ArrowIcon = styled.span`
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-right: 10px solid #000;
  margin-right: 10px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImageWrapper = styled.div`
  width: 300px;
  height: 340px;
  height: 60%;
  padding: 5px;
  box-sizing: border-box;
  position: relative;
  border-radius: 10px;
  overflow: hidden;
`;

const StyledImage = styled(Image)`
  align-self: center;
  border-radius: 10px;
`;

const Details = styled.div`
  margin-top: 10%;
  width: 180%;
  display: flex;
  border-radius: 10px;
  background-color: ${(props) => props.$color || "#fff"};
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Name = styled.h1`
  margin: 0;
  font-size: 2em;
`;

const Flavor = styled.p`
  font-size: 1.2em;
  font-style: italic;
`;

export default IngredientDetails;
