import React, { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Image,
  VStack,
  HStack,
  Flex,
  Badge,
  Button,
  Progress,
  SimpleGrid
} from '@chakra-ui/react';

interface ScoreData {
  overallScore: number;
  categories: {
    symmetry: number;
    proportion: number;
    skinQuality: number;
    expression: number;
  };
  recommendations: string[];
  imageUrl: string;
}

interface BeautyScoringResultsChakraProps {
  scoreData: ScoreData | null;
  onRetry: () => void;
}

const BeautyScoringResultsChakra: React.FC<BeautyScoringResultsChakraProps> = ({
  scoreData,
  onRetry
}) => {
  const [activeTab, setActiveTab] = useState<'score' | 'shape'>('score');

  if (!scoreData) {
    return (
      <Box
        minH="100vh"
        bg="linear-gradient(135deg, purple.50 0%, blue.50 50%, indigo.100 100%)"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <VStack spacing={6}>
          <Box position="relative">
            <Box
              w={20}
              h={20}
              border="4px solid"
              borderColor="purple.200"
              borderTopColor="purple.500"
              borderRadius="full"
              animation="spin 1s linear infinite"
              mx="auto"
            />
          </Box>
          <VStack spacing={2}>
            <Heading size="lg" color="purple.600">
              Analyzing...
            </Heading>
            <Text color="gray.600">
              Facial analysis offers personalized styling tips.
            </Text>
          </VStack>
        </VStack>
      </Box>
    );
  }

  // Convert score to emotion
  const getEmotionFromScore = (expressionScore: number) => {
    if (expressionScore >= 85) return '😄';
    if (expressionScore >= 75) return '😊';
    if (expressionScore >= 65) return '🙂';
    return '😐';
  };

  // Estimate age based on overall score
  const getEstimatedAge = (overallScore: number) => {
    return Math.floor(20 + (100 - overallScore) * 0.3);
  };

  const getScoreMessage = (score: number) => {
    if (score >= 90) return '🌟Perfect!';
    if (score >= 80) return '🌟Beautiful!';
    if (score >= 70) return '🌟Great!';
    if (score >= 60) return '🌟Good!';
    return '🌟Nice!';
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'green';
    if (score >= 80) return 'blue';
    if (score >= 70) return 'purple';
    if (score >= 60) return 'orange';
    return 'red';
  };

  return (
    <Box minH="100vh" bg="linear-gradient(135deg, purple.50 0%, blue.50 50%, indigo.100 100%)">
      <Container maxW="4xl" py={{ base: 6, md: 8 }} px={{ base: 4, md: 8 }}>
        {/* リザルト文言 */}
        <VStack spacing={{ base: 3, md: 4 }} mb={{ base: 6, md: 8 }} textAlign="center">
          <Heading
            size={{ base: 'xl', md: '2xl' }}
            bgGradient="linear(to-r, purple.600, blue.600)"
            bgClip="text"
          >
            {getScoreMessage(scoreData.overallScore)}
          </Heading>
          <Text
            fontSize={{ base: 'md', md: 'lg' }}
            color="gray.600"
            maxW="2xl"
          >
            AIによる顔分析が完了しました
          </Text>
        </VStack>

        {/* 顔画像 */}
        <Flex justify="center" mb={{ base: 6, md: 8 }}>
          <Box position="relative">
            <Image
              src={scoreData.imageUrl}
              alt="分析画像"
              w={{ base: 48, md: 64 }}
              h={{ base: 48, md: 64 }}
              objectFit="cover"
              borderRadius="xl"
              shadow="lg"
              border="4px solid white"
            />
            <Badge
              position="absolute"
              top={-2}
              right={-2}
              fontSize="lg"
              fontWeight="bold"
              bgGradient="linear(to-r, purple.500, blue.600)"
              color="white"
              borderRadius="full"
              w={12}
              h={12}
              display="flex"
              alignItems="center"
              justifyContent="center"
              shadow="lg"
            >
              {scoreData.overallScore}
            </Badge>
          </Box>
        </Flex>

        {/* タブView（シンプルな実装） */}
        <Box maxW="2xl" mx="auto">
          <Box bg="white" borderRadius="2xl" shadow="lg" overflow="hidden">
            {/* タブヘッダー */}
            <HStack borderBottom="1px solid" borderColor="gray.200" spacing={0}>
              <Button
                flex={1}
                py={4}
                fontWeight="medium"
                borderRadius={0}
                bg={activeTab === 'score' ? 'purple.500' : 'transparent'}
                color={activeTab === 'score' ? 'white' : 'gray.600'}
                _hover={{
                  bg: activeTab === 'score' ? 'purple.600' : 'purple.50',
                  color: activeTab === 'score' ? 'white' : 'purple.600'
                }}
                onClick={() => setActiveTab('score')}
              >
                Score
              </Button>
              <Button
                flex={1}
                py={4}
                fontWeight="medium"
                borderRadius={0}
                bg={activeTab === 'shape' ? 'purple.500' : 'transparent'}
                color={activeTab === 'shape' ? 'white' : 'gray.600'}
                _hover={{
                  bg: activeTab === 'shape' ? 'purple.600' : 'purple.50',
                  color: activeTab === 'shape' ? 'white' : 'purple.600'
                }}
                onClick={() => setActiveTab('shape')}
              >
                Shape
              </Button>
            </HStack>

            {/* タブコンテンツ */}
            <Box p={{ base: 6, md: 8 }}>
              {activeTab === 'score' && (
                <VStack spacing={6}>
                  <VStack spacing={2}>
                    <Heading size="2xl" color="purple.600">
                      {scoreData.overallScore}
                    </Heading>
                    <Text color="gray.600">総合スコア</Text>
                  </VStack>

                  <VStack spacing={4} w="full">
                    <HStack justify="space-between" w="full">
                      <Text color="gray.700">対称性</Text>
                      <HStack>
                        <Progress
                          value={scoreData.categories.symmetry}
                          colorScheme={getScoreColor(scoreData.categories.symmetry)}
                          w="100px"
                          size="sm"
                        />
                        <Text fontWeight="semibold" color="purple.600">
                          {scoreData.categories.symmetry}
                        </Text>
                      </HStack>
                    </HStack>

                    <HStack justify="space-between" w="full">
                      <Text color="gray.700">比例</Text>
                      <HStack>
                        <Progress
                          value={scoreData.categories.proportion}
                          colorScheme={getScoreColor(scoreData.categories.proportion)}
                          w="100px"
                          size="sm"
                        />
                        <Text fontWeight="semibold" color="purple.600">
                          {scoreData.categories.proportion}
                        </Text>
                      </HStack>
                    </HStack>

                    <HStack justify="space-between" w="full">
                      <Text color="gray.700">肌質</Text>
                      <HStack>
                        <Progress
                          value={scoreData.categories.skinQuality}
                          colorScheme={getScoreColor(scoreData.categories.skinQuality)}
                          w="100px"
                          size="sm"
                        />
                        <Text fontWeight="semibold" color="purple.600">
                          {scoreData.categories.skinQuality}
                        </Text>
                      </HStack>
                    </HStack>

                    <HStack justify="space-between" w="full">
                      <Text color="gray.700">表情</Text>
                      <HStack>
                        <Progress
                          value={scoreData.categories.expression}
                          colorScheme={getScoreColor(scoreData.categories.expression)}
                          w="100px"
                          size="sm"
                        />
                        <Text fontWeight="semibold" color="purple.600">
                          {scoreData.categories.expression}
                        </Text>
                      </HStack>
                    </HStack>
                  </VStack>
                </VStack>
              )}

              {activeTab === 'shape' && (
                <VStack spacing={6}>
                  <Heading size="lg" color="gray.800" textAlign="center">
                    顔の形状分析
                  </Heading>

                  <SimpleGrid columns={2} spacing={4} w="full">
                    <Box textAlign="center" p={4} bg="gray.50" borderRadius="lg">
                      <Text fontSize="3xl" mb={2}>
                        {getEmotionFromScore(scoreData.categories.expression)}
                      </Text>
                      <Heading size="md" color="purple.600" mb={1}>
                        Emotion
                      </Heading>
                      <Text fontSize="sm" color="gray.600">
                        表情分析
                      </Text>
                    </Box>

                    <Box textAlign="center" p={4} bg="gray.50" borderRadius="lg">
                      <Text fontSize="3xl" mb={2}>🎂</Text>
                      <Heading size="md" color="purple.600" mb={1}>
                        {getEstimatedAge(scoreData.overallScore)}
                      </Heading>
                      <Text fontSize="sm" color="gray.600">
                        推定年齢
                      </Text>
                    </Box>
                  </SimpleGrid>

                  <Text textAlign="center" color="gray.600" fontSize="sm">
                    顔の形状と特徴を分析した結果です
                  </Text>
                </VStack>
              )}
            </Box>
          </Box>

          {/* やり直しボタン */}
          <Flex justify="center" mt={8}>
            <Button
              onClick={onRetry}
              bg="white"
              color="purple.600"
              border="2px solid"
              borderColor="purple.300"
              borderRadius="full"
              fontWeight="medium"
              px={8}
              py={3}
              shadow="lg"
              _hover={{
                bg: "purple.50",
                borderColor: "purple.400"
              }}
            >
              もう一度解析する
            </Button>
          </Flex>
        </Box>
      </Container>
    </Box>
  );
};

export default BeautyScoringResultsChakra;