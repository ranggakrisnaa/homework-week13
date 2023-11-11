import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { createBook, editBook } from "../modules/fetch";

export default function BookForm({ bookData }) {
  const toast = useToast();
  const [selectedImage, setSelectedImage] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    if (!selectedImage) {
      toast({
        title: "Error",
        description: "Please select image",
        status: "error",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
    }
    const formData = new FormData(event.target);
    if (bookData) {
      try {
        await editBook(
          bookData.id,
          formData.get("title"),
          formData.get("author"),
          formData.get("publisher"),
          parseInt(formData.get("year")),
          parseInt(formData.get("pages"))
        );
        toast({
          title: "Success",
          description: "Book edited successfully",
          status: "success",
          position: "top",
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: "Error",
          position: "top",
          description: error.response.data.message || "Something went wrong",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
      return;
    }
    try {
      await createBook(formData);
      event.target.reset();
      toast({
        title: "Success",
        position: "top",
        description: "Book created successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setSelectedImage("");
    } catch (error) {
      toast({
        title: "Error",
        position: "top",
        description: error.response.data.message || "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }

  useEffect(() => {
    if (bookData?.image) {
      setSelectedImage(`http://localhost:8000/${bookData?.image}`);
    }
  }, [bookData]);

  return (
    <Box
      bgColor={"#4a4e69"}
      rounded={"md"}
      w={"600px"}
      p={"9"}
      mt={10}
      shadow={"lg"}
    >
      <Text
        fontSize={"25px"}
        fontWeight={"semibold"}
        mb={"20px"}
        color={"white"}
      >
        {bookData ? "Form Edit Book" : "Form Create Book"}
      </Text>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} color="white">
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input name="title" required defaultValue={bookData?.title} />
          </FormControl>
          <FormControl>
            <FormLabel>Author</FormLabel>
            <Input name="author" required defaultValue={bookData?.author} />
          </FormControl>
          <FormControl>
            <FormLabel>Publisher</FormLabel>
            <Input
              name="publisher"
              required
              defaultValue={bookData?.publisher}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Year</FormLabel>
            <Input
              name="year"
              type="number"
              required
              defaultValue={bookData?.year}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Pages</FormLabel>
            <Input
              name="pages"
              type="number"
              required
              defaultValue={bookData?.pages}
            />
          </FormControl>
          {selectedImage && (
            <Image w={64} src={selectedImage} alt="Selected Image" />
          )}
          {!bookData?.image && (
            <FormControl>
              <FormLabel>Image</FormLabel>
              <Input
                paddingY={"3px"}
                pl={"10px"}
                name="image"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setSelectedImage(URL.createObjectURL(file));
                }}
              />
            </FormControl>
          )}

          <Button color={"black"} type="submit">
            {bookData ? "Edit Book" : "Create Book"}
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
