import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Skeleton,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteBook, getBookDetailById } from "../modules/fetch";

export default function BookDetails() {
  const [book, setBook] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await getBookDetailById(id);
        setBook(response.book);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    fetchBook();
  }, [id]);

  const handleDeleteBook = async () => {
    try {
      await deleteBook(id);
      toast({
        title: "Deleted",
        position: "top",
        description: "Your book successfully deleted.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box>
      <Box
        bgColor={"#1d2d44"}
        p={"40px"}
        marginTop={"20px"}
        rounded={"10px"}
        border={"2px"}
        color={"orange.300"}
        shadow={"lg"}
      >
        {isLoading ? (
          <Skeleton height="300px" my="6" />
        ) : (
          <Box>
            <Text
              color={"white"}
              fontWeight={"bold"}
              fontSize={"38px"}
              mb={"20px"}
              textAlign={"center"}
            >
              Book Description
            </Text>
            <Flex>
              <Box w="300px" mb={"30px"}>
                <Image
                  src={`http://localhost:8000/${book.image}`}
                  alt={book.title}
                />
              </Box>
              <Box ml="8" color={"white"}>
                <Heading as="h1" size="lg">
                  Title: {book.title}
                </Heading>
                <Text fontSize="xl" fontWeight="semibold" color="gray.500">
                  Author: {book.author}
                </Text>
                <Text fontSize="xl" fontWeight="semibold" color="gray.500">
                  Publisher: {book.publisher}
                </Text>
                <Text
                  fontSize="xl"
                  fontWeight="semibold"
                  color="gray.500"
                  mb="4"
                >
                  Release Year: {book.year} | Book Pages: {book.pages} pages
                </Text>
              </Box>
            </Flex>
          </Box>
        )}
        {localStorage.getItem("token") && (
          <HStack>
            <Popover>
              <PopoverTrigger>
                <Button colorScheme="red">Delete</Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Confirmation!</PopoverHeader>
                <PopoverBody>
                  Are you sure you want to delete this book?
                </PopoverBody>
                <Button onClick={handleDeleteBook} colorScheme="red">
                  Delete
                </Button>
              </PopoverContent>
            </Popover>
            <Link to={`/editbook/${id}`}>
              <Button color={"blue.800"}>Edit</Button>
            </Link>
          </HStack>
        )}
      </Box>
    </Box>
  );
}
