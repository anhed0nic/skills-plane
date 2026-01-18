"use client";

import { Button, Group } from "@mantine/core";
import { IconSearch, IconUpload } from "@tabler/icons-react";
import Link from "next/link";

export function HeroButtons() {
    return (
        <Group mt="md">
            <Button
                component={Link}
                href="/dashboard"
                size="lg"
                radius="md"
                px={40}
                variant="filled"
                color="cyan"
                leftSection={<IconSearch size={20} />}
                styles={{ root: { height: '54px' } }}
            >
                Browse Skills
            </Button>
            <Button
                component={Link}
                href="/skills/new"
                size="lg"
                radius="md"
                px={40}
                variant="outline"
                color="gray"
                leftSection={<IconUpload size={20} />}
                styles={{ root: { height: '54px', border: '1px solid rgba(255, 255, 255, 0.1)', background: 'rgba(255, 255, 255, 0.02)' } }}
            >
                Submit Skill
            </Button>
        </Group>
    );
}
