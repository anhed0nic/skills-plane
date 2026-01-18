"use client";

import {
    Group,
    Button,
    Text,
    Avatar,
    Menu,
    rem,
    Container,
    Box,
} from "@mantine/core";
import {
    IconLogout,
    IconUser,
    IconSettings,
    IconLogin,
    IconRocket,
    IconBrandGithub,
} from "@tabler/icons-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase-browser";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

export function Navbar() {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        const getUser = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser();
            setUser(user);
        };

        getUser();

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, [supabase]);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.refresh();
    };

    return (
        <div style={{ background: '#06090f', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <Container size="lg">
                <Group justify="space-between" h={70}>
                    <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
                        <Group gap={8}>
                            <IconRocket size={24} color="#22e1fe" />
                            <Text fw={800} size="lg" style={{ letterSpacing: '-0.5px' }}>
                                Skills Plane
                            </Text>
                        </Group>
                    </Link>

                    <Group gap="xl">
                        <Link href="/skills" style={{ textDecoration: 'none' }}>
                            <Box
                                visibleFrom="sm"
                                px="md"
                                py={6}
                                style={{
                                    background: 'rgba(255, 255, 255, 0.03)',
                                    borderRadius: '8px',
                                    border: '1px solid rgba(255, 255, 255, 0.05)',
                                    cursor: 'pointer'
                                }}
                            >
                                <Text ff="monospace" size="xs" c="dimmed">$ npx add-skill owner/repo</Text>
                            </Box>
                        </Link>
                        <Group gap="md">
                            <Link
                                href="https://github.com/atilaahmettaner/skills-plane"
                                target="_blank"
                                style={{ color: 'rgba(255, 255, 255, 0.5)', textDecoration: 'none' }}
                                className="github-link-hover"
                            >
                                <Group gap={4}>
                                    <IconBrandGithub size={20} />
                                    <Text size="xs" visibleFrom="xs" fw={500}>Star on GitHub</Text>
                                </Group>
                            </Link>

                            {user ? (
                                <Group gap="sm">
                                    <Button
                                        component={Link}
                                        href="/skills"
                                        variant="subtle"
                                        visibleFrom="xs"
                                        size="sm"
                                    >
                                        Explore
                                    </Button>
                                    <Button
                                        component={Link}
                                        href="/skills/new"
                                        variant="outline"
                                        size="sm"
                                        leftSection={<IconRocket size={16} />}
                                    >
                                        Submit
                                    </Button>
                                    <Menu shadow="md" width={200} position="bottom-end">
                                        <Menu.Target>
                                            <Button
                                                variant="subtle"
                                                size="sm"
                                                p={4}
                                                style={{ height: 'auto' }}
                                            >
                                                <Avatar
                                                    src={user.user_metadata.avatar_url}
                                                    alt={user.user_metadata.full_name}
                                                    radius="xl"
                                                    size="sm"
                                                />
                                            </Button>
                                        </Menu.Target>

                                        <Menu.Dropdown>
                                            <Menu.Label>Application</Menu.Label>
                                            <Menu.Item
                                                component={Link}
                                                href="/dashboard"
                                                leftSection={
                                                    <IconUser style={{ width: rem(14), height: rem(14) }} />
                                                }
                                            >
                                                Dashboard
                                            </Menu.Item>
                                            <Menu.Item
                                                leftSection={
                                                    <IconSettings
                                                        style={{ width: rem(14), height: rem(14) }}
                                                    />
                                                }
                                            >
                                                Settings
                                            </Menu.Item>

                                            <Menu.Divider />

                                            <Menu.Item
                                                color="red"
                                                leftSection={
                                                    <IconLogout
                                                        style={{ width: rem(14), height: rem(14) }}
                                                    />
                                                }
                                                onClick={handleSignOut}
                                            >
                                                Sign out
                                            </Menu.Item>
                                        </Menu.Dropdown>
                                    </Menu>
                                </Group>
                            ) : (
                                <Button
                                    component={Link}
                                    href="/login"
                                    variant="default"
                                    size="sm"
                                    leftSection={<IconLogin size={16} />}
                                >
                                    Sign in
                                </Button>
                            )}
                        </Group>
                    </Group>
                </Group>
            </Container>
        </div>
    );
}
