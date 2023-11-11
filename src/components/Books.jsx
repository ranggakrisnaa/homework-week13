import { Box, Card, Heading, Image, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Books({ id, title, author, image, publisher, year }) {
  return (
    <Link to={`/books/${id}`}>
      <Card
        key={id}
        w={"280px"}
        _hover={{ transform: `translateY(-20px);` }}
        shadow={"lg"}
        border={"2px"}
        borderColor={"#219ebc"}
        transition={`transform .50s, visibility .50s ease-in`}
        h={"440px"}
        my={4}
        p={2}
        cursor="pointer"
      >
        <VStack>
          <Box overflow={"hidden"}>
            <Image
              w={"64"}
              transition={`transform .50s, visibility .50s ease-in`}
              _hover={{ transform: `scale(1.2);` }}
              h={"72"}
              src={`http://localhost:8000/${image}`}
            />
          </Box>
          <Heading size={"md"} textAlign={"center"}>
            {title} ({year})
          </Heading>
          <Text>{author}</Text>
          <Text>
            <span>Publisher: </span>
            {publisher}
          </Text>
        </VStack>
      </Card>
    </Link>
  );
}
