import { Box, Flex, Heading, Link, Text } from '@chakra-ui/react'
import { Github } from 'lucide-react'
import { FC } from 'react'

export const Footer: FC = () => {
  return (
    <Box
      as="footer"
      position="fixed"
      bottom="0"
      left="0"
      w="100%"
      px="12"
      py="6"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Heading as="h2" size="md">
        Just TodoIt!
      </Heading>
      <Link href="https://github.com/ArseniyMuravyev" isExternal>
        <Flex gap="4">
          <Github />
          <Text>Github</Text>
        </Flex>
      </Link>
    </Box>
  )
}
