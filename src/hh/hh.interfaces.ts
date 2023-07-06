export interface IHhResponse {
	items: Vacancy[]
	found: number
	pages: number
	per_page: number
	page: number
	clusters: ClusterElement[]
	arguments: any
	alternate_url: string
}

export interface Vacancy {
	id: string
	premium: boolean
	name: string
	department: any
	has_test: boolean
	response_letter_required: boolean
	area: Area
	salary?: Salary
	type: Type
	address?: Address
	response_url: any
	sort_point_distance: any
	published_at: string
	created_at: string
	archived: boolean
	apply_alternate_url: string
	insider_interview: any
	url: string
	alternate_url: string
	relations: any[]
	employer: Employer
	snippet: Snippet
	contacts: any
	schedule: any
	working_days: any[]
	working_time_intervals: any[]
	working_time_modes: any[]
	accept_temporary: boolean
	professional_roles: ProfessionalRole[]
	accept_incomplete_resumes: boolean
	experience: Experience
	employment: Employment
	adv_response_url: any
	is_adv_vacancy: boolean
}

export interface Area {
	id: string
	name: string
	url: string
}

export interface Salary {
	from?: number
	to?: number
	currency: string
	gross: boolean
}

export interface Type {
	id: string
	name: string
}

export interface Address {
	city: string
	street: string
	building: string
	lat: number
	lng: number
	description: any
	raw: string
	metro?: MetroStation
	metro_stations: MetroStation[]
	id: string
}


export interface MetroStation {
	station_name: string
	line_name: string
	station_id: string
	line_id: string
	lat: number
	lng: number
}

export interface Employer {
	id: string
	name: string
	url: string
	alternate_url: string
	logo_urls?: LogoUrls
	vacancies_url: string
	accredited_it_employer: boolean
	trusted: boolean
}

export interface LogoUrls {
	original: string
	"240": string
	"90": string
}

export interface Snippet {
	requirement: string
	responsibility?: string
}

export interface ProfessionalRole {
	id: string
	name: string
}

export interface Experience {
	id: string
	name: string
}

export interface Employment {
	id: string
	name: string
}

export interface ClusterElement {
	name: string
	id: string
	items: ClusterItem[]
}

export interface ClusterItem {
	name: string
	url: string
	count: number
}
