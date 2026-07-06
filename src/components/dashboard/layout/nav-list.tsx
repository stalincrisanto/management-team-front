"use client";

import * as React from "react";
import RouterLink from "next/link";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { CaretDownIcon } from "@phosphor-icons/react/dist/ssr/CaretDown";
import { CaretRightIcon } from "@phosphor-icons/react/dist/ssr/CaretRight";

import type { NavItemConfig } from "@/types/nav";
import { isNavItemActive } from "@/lib/is-nav-item-active";

import { navIcons } from "./nav-icons";

interface NavListProps {
	items?: NavItemConfig[];
	pathname: string;
	onItemClick?: () => void;
}

export function NavList({ items = [], pathname, onItemClick }: NavListProps): React.JSX.Element {
	return (
		<Stack component="ul" spacing={1} sx={{ listStyle: "none", m: 0, p: 0 }}>
			{items.map((item) => {
				const hasChildren = Boolean(item.items?.length);

				if (hasChildren) {
					return <NavGroup key={item.key} item={item} pathname={pathname} onItemClick={onItemClick} />;
				}

				return <NavLeaf key={item.key} item={item} pathname={pathname} onItemClick={onItemClick} />;
			})}
		</Stack>
	);
}

interface NavGroupProps {
	item: NavItemConfig;
	pathname: string;
	onItemClick?: () => void;
}

function NavGroup({ item, pathname, onItemClick }: NavGroupProps): React.JSX.Element {
	const active = hasActiveChild(item, pathname);

	const [open, setOpen] = React.useState(active);

	React.useEffect(() => {
		if (active) {
			setOpen(true);
		}
	}, [active]);

	const Icon = item.icon ? navIcons[item.icon] : null;

	return (
		<li>
			<Box
				component="button"
				type="button"
				onClick={() => {
					setOpen((current) => !current);
				}}
				sx={{
					alignItems: "center",
					backgroundColor: "transparent",
					border: 0,
					borderRadius: 1,
					color: active ? "var(--mui-palette-common-white)" : "var(--NavItem-color)",
					cursor: "pointer",
					display: "flex",
					font: "inherit",
					gap: 1,
					p: "6px 16px",
					textAlign: "left",
					textDecoration: "none",
					width: "100%",
					"&:hover": {
						bgcolor: "var(--NavItem-hover-background)",
					},
				}}
			>
				<Box sx={{ alignItems: "center", display: "flex", justifyContent: "center", flex: "0 0 auto" }}>
					{Icon ? (
						<Icon
							fill={active ? "var(--mui-palette-common-white)" : "var(--NavItem-icon-color)"}
							fontSize="var(--icon-fontSize-md)"
							weight={active ? "fill" : undefined}
						/>
					) : null}
				</Box>

				<Box sx={{ flex: "1 1 auto" }}>
					<Typography
						component="span"
						sx={{ color: "inherit", fontSize: "0.875rem", fontWeight: 600, lineHeight: "28px" }}
					>
						{item.title}
					</Typography>
				</Box>

				{open ? (
					<CaretDownIcon fontSize="var(--icon-fontSize-sm)" />
				) : (
					<CaretRightIcon fontSize="var(--icon-fontSize-sm)" />
				)}
			</Box>

			<Collapse in={open} timeout="auto" unmountOnExit>
				<Stack component="ul" spacing={0.5} sx={{ listStyle: "none", m: 0, mt: 0.5, p: 0, pl: 2 }}>
					{item.items?.map((child) => (
						<NavLeaf key={child.key} item={child} pathname={pathname} onItemClick={onItemClick} nested />
					))}
				</Stack>
			</Collapse>
		</li>
	);
}

interface NavLeafProps {
	item: NavItemConfig;
	pathname: string;
	nested?: boolean;
	onItemClick?: () => void;
}

function NavLeaf({ item, pathname, nested = false, onItemClick }: NavLeafProps): React.JSX.Element {
	const { disabled, external, href, icon, matcher, title } = item;

	const active = isNavItemActive({
		disabled,
		external,
		href,
		matcher,
		pathname,
	});

	const Icon = icon ? navIcons[icon] : null;

	return (
		<li>
			<Box
				{...(href
					? {
							component: external ? "a" : RouterLink,
							href,
							target: external ? "_blank" : undefined,
							rel: external ? "noreferrer" : undefined,
							onClick: onItemClick,
						}
					: { role: "button" })}
				sx={{
					alignItems: "center",
					borderRadius: 1,
					color: "var(--NavItem-color)",
					cursor: disabled ? "not-allowed" : "pointer",
					display: "flex",
					flex: "0 0 auto",
					gap: 1,
					minHeight: 36,
					p: nested ? "6px 12px" : "6px 16px",
					pl: nested ? 3 : "16px",
					position: "relative",
					textDecoration: "none",
					whiteSpace: "nowrap",
					"&:hover": {
						bgcolor: disabled ? "transparent" : "var(--NavItem-hover-background)",
					},
					...(disabled && {
						bgcolor: "var(--NavItem-disabled-background)",
						color: "var(--NavItem-disabled-color)",
					}),
					...(active && {
						bgcolor: "var(--NavItem-active-background)",
						color: "var(--NavItem-active-color)",
					}),
				}}
			>
				<Box sx={{ alignItems: "center", display: "flex", justifyContent: "center", flex: "0 0 auto" }}>
					{Icon ? (
						<Icon
							fill={active ? "var(--NavItem-icon-active-color)" : "var(--NavItem-icon-color)"}
							fontSize="var(--icon-fontSize-md)"
							weight={active ? "fill" : undefined}
						/>
					) : null}
				</Box>

				<Box sx={{ flex: "1 1 auto" }}>
					<Typography
						component="span"
						sx={{
							color: "inherit",
							fontSize: nested ? "0.8125rem" : "0.875rem",
							fontWeight: active ? 600 : 500,
							lineHeight: "28px",
						}}
					>
						{title}
					</Typography>
				</Box>
			</Box>
		</li>
	);
}

function hasActiveChild(item: NavItemConfig, pathname: string): boolean {
	return Boolean(
		item.items?.some((child) =>
			isNavItemActive({
				disabled: child.disabled,
				external: child.external,
				href: child.href,
				matcher: child.matcher,
				pathname,
			})
		)
	);
}
