import type { NavItemConfig } from "@/types/nav";
import { paths } from "@/paths";

export const navItems = [
	{ key: "dashboard", title: "Dashboard", href: paths.dashboard2, icon: "dashboard" },
	{
		key: "treasury",
		title: "Tesorería",
		icon: "money",
		items: [
			{
				key: "treasury-seasons",
				title: "Temporadas",
				href: paths.treasury.seasons,
				icon: "soccer",
			},
			{
				key: "treasury-periods",
				title: "Jornadas",
				href: paths.treasury.periods,
				icon: "calendar",
			},
			{
				key: "treasury-reports",
				title: "Reportes",
				href: paths.treasury.reports,
				icon: "chart-pie",
			},
		],
	},
	{ key: "overview", title: "Overview", href: paths.dashboard.overview, icon: "chart-pie" },
	{ key: "customers", title: "Customers", href: paths.dashboard.customers, icon: "users" },
	{ key: "integrations", title: "Integrations", href: paths.dashboard.integrations, icon: "plugs-connected" },
	{ key: "settings", title: "Settings", href: paths.dashboard.settings, icon: "gear-six" },
	{ key: "account", title: "Account", href: paths.dashboard.account, icon: "user" },
	{ key: "error", title: "Error", href: paths.errors.notFound, icon: "x-square" },
] satisfies NavItemConfig[];
