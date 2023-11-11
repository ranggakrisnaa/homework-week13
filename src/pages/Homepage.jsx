import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Books from "../components/Books";
import { getAllBooks } from "../modules/fetch";

export default function Homepage() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const books = await getAllBooks();
      setBooks(books);
    };
    fetchBooks();
  }, []);

  const NotFoundPage = () => {
    return (
      <Box
        justifyContent={"center"}
        mt={"200px"}
        alignItems={"center"}
        bgColor={"gray.200"}
        w={"500px"}
        mx={"auto"}
        rounded={"lg"}
        p={"20px"}
      >
        <Text fontSize={"40px"} color={"black"} align={"center"}>
          Books Is Not Found !
        </Text>
      </Box>
    );
  };

  return (
    <Box w="full">
      <Text
        color={"white"}
        fontSize={"32px"}
        fontWeight={"semibold"}
        ml={"5"}
        mt={"5"}
        textAlign={"left"}
      >
        List Of Books
      </Text>
      {books.length === 0 && <NotFoundPage />}
      <Flex
        gap={"40px"}
        flexWrap={"wrap"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        {books?.books?.map((book) => (
          <Books key={`${book.id} ${book.title}`} {...book} />
        ))}
      </Flex>
    </Box>
  );
}
