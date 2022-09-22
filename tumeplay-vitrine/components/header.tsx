import { Box, Image, Heading, Link, Text } from "@chakra-ui/react";

const Header = () => {
  return (
    <Box display="flex" alignItems="center" flexDirection="column" py={10}>
      <Image
        src="/logo-tumeplay.svg"
        alt="Tumeplay logo"
        w={[48, 48, "auto"]}
      />
      <Heading
        mt={[6, 6, 10]}
        mb={[4, 4, 6]}
        fontSize={["2xl", "2xl", "auto"]}
        textAlign={["center", "center", "left"]}
      >
        TU CROIS TOUT SAVOIR SUR LE{" "}
        <Box as="span" color="primary" fontSize={["3xl", "3xl", "5xl"]}>
          SEXE ?
        </Box>
      </Heading>
      <Box
        display="flex"
        alignItems="center"
        flexDirection={["column", "column", "row"]}
      >
        <Link
          href="https://apps.apple.com/fr/app/tumeplay/id1559879813"
          target="_blank"
        >
          <Image
            mr={4}
            w="full"
            src="/button-ios.svg"
            alt="Télécharge tumeplay sur iOS"
            opacity={0.8}
            _hover={{ opacity: 0.6 }}
          />
        </Link>
        <Link
          href="https://play.google.com/store/apps/details?id=com.tumeplaymobile"
          target="_blank"
        >
          <Image
            ml={[0, 0, 4]}
            mt={[4, 4, 0]}
            w="full"
            src="/button-android.svg"
            alt="Télécharge tumeplay sur Android"
            opacity={0.8}
            _hover={{ opacity: 0.6 }}
          />
        </Link>
      </Box>
      <Box pt={5}>
        <Text fontWeight="bold" textAlign={["center", "center", "left"]}>
          Retrouve-nous sur les réseaux sociaux pour découvrir nos actualités
        </Text>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          justifyItems="center"
          pt={2}
        >
          <Link href="https://www.instagram.com/tumeplay/" target="_blank">
            <Image
              src="/instagram.png"
              alt="Instgram Tumeplay"
              w={12}
              mr={2}
              opacity={1}
              _hover={{ opacity: 0.8 }}
            />
          </Link>
          <Link
            href="https://www.tiktok.com/@tu.me.play"
            target="_blank"
            w={12}
            opacity={1}
            _hover={{ opacity: 0.8 }}
          >
            <Image src="/Tiktok.png" alt="Instgram TikTok" />
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
