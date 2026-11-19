<?php

namespace App\Http\Requests;

use App\Enums\ContractType;
use App\Support\ContractFilters;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ContractSearchRequest extends FormRequest
{
    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'search' => ['nullable', 'string', 'max:120'],
            'types' => ['nullable', 'array'],
            'types.*' => [Rule::enum(ContractType::class)],
            'city' => ['nullable', 'string', 'max:120'],
            'min_hourly_rate' => ['nullable', 'numeric', 'min:0', 'max:999'],
            'available_from' => ['nullable', 'date_format:Y-m-d'],
        ];
    }

    public function filters(): ContractFilters
    {
        return ContractFilters::fromArray($this->validated());
    }
}
