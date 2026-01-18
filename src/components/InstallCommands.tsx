"use client";

import { Stack, Text, Code, Group, CopyButton, Button, Box } from "@mantine/core";
import { IconCopy, IconCheck } from "@tabler/icons-react";

interface InstallCommandsProps {
    slug: string;
    githubUrl?: string;
}

export function InstallCommands({ slug, githubUrl }: InstallCommandsProps) {
    const platformCommand = `npx skills-plane add ${slug}`;
    const githubCommand = githubUrl ? `npx add-skill ${githubUrl}` : null;

    return (
        <Stack gap="sm">
            <Text size="sm" fw={500} c="dimmed">
                Installation command:
            </Text>

            {/* GitHub-sourced skill: Prioritize add-skill */}
            {githubUrl ? (
                <Stack gap="xs">
                    <Box>
                        <Group gap="xs" wrap="nowrap">
                            <Code style={{ flex: 1, fontSize: '0.85rem' }}>
                                {`npx add-skill ${githubUrl}`}
                            </Code>
                            <CopyButton value={`npx add-skill ${githubUrl}`} timeout={2000}>
                                {({ copied, copy }) => (
                                    <Button
                                        size="xs"
                                        variant="filled"
                                        color={copied ? 'teal' : 'cyan'}
                                        onClick={copy}
                                        leftSection={copied ? <IconCheck size={14} /> : <IconCopy size={14} />}
                                    >
                                        {copied ? 'Copied!' : 'Copy'}
                                    </Button>
                                )}
                            </CopyButton>
                        </Group>
                        <Text size="xs" c="cyan" mt={4} fw={500}>
                            ✨ Recommended: Vercel standard installer
                        </Text>
                    </Box>

                    <Box mt="md">
                        <Text size="xs" fw={500} c="dimmed" mb={4}>Alternative:</Text>
                        <Group gap="xs" wrap="nowrap">
                            <Code style={{ flex: 1, fontSize: '0.81rem', opacity: 0.7 }}>
                                {platformCommand}
                            </Code>
                            <CopyButton value={platformCommand} timeout={2000}>
                                {({ copied, copy }) => (
                                    <Button
                                        size="xs"
                                        variant="subtle"
                                        color="gray"
                                        onClick={copy}
                                    >
                                        {copied ? 'Copied!' : 'Copy'}
                                    </Button>
                                )}
                            </CopyButton>
                        </Group>
                    </Box>
                </Stack>
            ) : (
                /* Platform Command - Primary for non-GitHub skills */
                <Box>
                    <Group gap="xs" wrap="nowrap">
                        <Code style={{ flex: 1, fontSize: '0.85rem' }}>
                            {platformCommand}
                        </Code>
                        <CopyButton value={platformCommand} timeout={2000}>
                            {({ copied, copy }) => (
                                <Button
                                    size="xs"
                                    variant="light"
                                    color={copied ? 'teal' : 'blue'}
                                    onClick={copy}
                                    leftSection={copied ? <IconCheck size={14} /> : <IconCopy size={14} />}
                                >
                                    {copied ? 'Copied!' : 'Copy'}
                                </Button>
                            )}
                        </CopyButton>
                    </Group>
                </Box>
            )}
        </Stack>
    );
}
