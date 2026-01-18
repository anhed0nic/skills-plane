"use client";

import { Container, Title, Text, Button, Stack, Paper, Box } from "@mantine/core";
import { IconAlertCircle, IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";

export default function AuthCodeErrorPage() {
    return (
        <Container size="xs" py={100}>
            <div className="hero-glow" style={{ opacity: 0.1 }} />
            <Paper shadow="md" p="xl" radius="md" withBorder style={{
                background: 'rgba(13, 17, 23, 0.8)',
                backdropFilter: 'blur(10px)',
                borderColor: 'rgba(255, 255, 255, 0.05)'
            }}>
                <Stack align="center" gap="lg">
                    <Box p="md" style={{ background: 'rgba(255, 0, 0, 0.1)', borderRadius: '50%' }}>
                        <IconAlertCircle size={48} color="#fa5252" />
                    </Box>

                    <Stack gap={4} align="center">
                        <Title order={2} className="text-bright">Authentication Error</Title>
                        <Text c="dimmed" size="sm" ta="center">
                            We couldn't verify your login link. This usually happens for a few reasons:
                        </Text>
                    </Stack>

                    <Stack gap="xs" style={{ width: '100%' }}>
                        <Box p="sm" style={{ background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px' }}>
                            <Text size="xs" fw={700} tt="uppercase" mb={4}>1. Mismatched Browser</Text>
                            <Text size="xs" c="dimmed">The magic link was requested in one browser but opened in another. Try using the same browser.</Text>
                        </Box>
                        <Box p="sm" style={{ background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px' }}>
                            <Text size="xs" fw={700} tt="uppercase" mb={4}>2. Link Expired</Text>
                            <Text size="xs" c="dimmed">Magic links are valid for a short time and only work once. Request a new link.</Text>
                        </Box>
                    </Stack>

                    <Button
                        component={Link}
                        href="/login"
                        variant="light"
                        leftSection={<IconArrowLeft size={16} />}
                        fullWidth
                    >
                        Back to Login
                    </Button>
                </Stack>
            </Paper>
        </Container>
    );
}
