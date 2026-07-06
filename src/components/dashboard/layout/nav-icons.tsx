import { MoneyIcon } from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react/dist/lib/types";
import { CalendarCheckIcon } from "@phosphor-icons/react/dist/ssr/CalendarCheck";
import { ChartPieIcon } from "@phosphor-icons/react/dist/ssr/ChartPie";
import { GearSixIcon } from "@phosphor-icons/react/dist/ssr/GearSix";
import { PlugsConnectedIcon } from "@phosphor-icons/react/dist/ssr/PlugsConnected";
import { SoccerBallIcon } from "@phosphor-icons/react/dist/ssr/SoccerBall";
import { UserIcon } from "@phosphor-icons/react/dist/ssr/User";
import { UsersIcon } from "@phosphor-icons/react/dist/ssr/Users";
import { XSquare } from "@phosphor-icons/react/dist/ssr/XSquare";

export const navIcons = {
	dashboard: ChartPieIcon,
	money: MoneyIcon,
	soccer: SoccerBallIcon,
	calendar: CalendarCheckIcon,
	"chart-pie": ChartPieIcon,
	"gear-six": GearSixIcon,
	"plugs-connected": PlugsConnectedIcon,
	"x-square": XSquare,
	user: UserIcon,
	users: UsersIcon,
} as Record<string, Icon>;
