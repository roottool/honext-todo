'use client'

import {
	Button,
	Calendar,
	CalendarCell,
	CalendarGrid,
	CalendarGridBody,
	CalendarGridHeader,
	CalendarHeaderCell,
	Dialog,
	Heading,
	Popover,
} from 'react-aria-components'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

export default function CalendarPopover() {
	return (
		<Popover>
			<Dialog className="bg-gray-50 text-gray-600 p-6">
				<Calendar>
					<header className="flex items-center gap-1 pb-4 px-1 w-full">
						<Button slot="previous">
							<FaChevronLeft />
						</Button>
						<Heading className="flex-1 font-semibold text-2xl text-center" />
						<Button slot="next">
							<FaChevronRight />
						</Button>
					</header>
					<CalendarGrid className="border-spacing-1 border-separate">
						<CalendarGridHeader>
							{(day) => (
								<CalendarHeaderCell className="text-xs text-gray-500 font-semibold">
									{day}
								</CalendarHeaderCell>
							)}
						</CalendarGridHeader>
						<CalendarGridBody>
							{(date) => (
								<CalendarCell
									date={date}
									className="w-9 h-9 outline-none cursor-default rounded-full flex items-center justify-center outside-month:text-gray-300 hover:bg-gray-100 pressed:bg-gray-200 selected:bg-violet-700 selected:text-white focus-visible:ring ring-violet-600/70 ring-offset-2"
								/>
							)}
						</CalendarGridBody>
					</CalendarGrid>
				</Calendar>
			</Dialog>
		</Popover>
	)
}
