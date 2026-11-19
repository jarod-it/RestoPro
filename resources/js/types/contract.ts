export type ContractOffer = {
    id: string;
    title: string;
    restaurant_name: string;
    city: string;
    description: string;
    hourly_rate: number;
    contract_type: string;
    weekly_hours: number;
    starts_on: string;
    ends_on: string | null;
    image_url: string;
};

export type ContractTypeOption = {
    value: string;
    label: string;
};

export type ContractSearchFilters = {
    search: string | null;
    types: string[];
    city: string | null;
    min_hourly_rate: number | null;
    available_from: string | null;
};

export type ContractOffersPage = {
    data: ContractOffer[];
    meta: {
        current_page: number;
        last_page: number;
        total: number;
    };
    links: {
        previous: string | null;
        next: string | null;
    };
};
