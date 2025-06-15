
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Search, 
  Calendar, 
  Filter, 
  X, 
  Plus,
  Settings
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ClinicalDataType } from '@/types/clinical';

export interface SearchFilter {
  id: string;
  field: string;
  operator: 'equals' | 'contains' | 'starts_with' | 'date_range' | 'greater_than' | 'less_than';
  value: string | { start: string; end: string };
  label: string;
}

interface AdvancedSearchProps {
  onSearch: (query: string, filters: SearchFilter[]) => void;
  onClear: () => void;
  dataType: ClinicalDataType;
  isLoading?: boolean;
}

const AdvancedSearch = ({ onSearch, onClear, dataType, isLoading }: AdvancedSearchProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilter[]>([]);
  const [showFilterBuilder, setShowFilterBuilder] = useState(false);

  // Get available fields based on data type
  const getAvailableFields = (type: ClinicalDataType) => {
    const commonFields = [
      { value: 'start_date', label: 'Start Date', type: 'date' },
      { value: 'description', label: 'Description', type: 'text' },
      { value: 'created_at', label: 'Created Date', type: 'date' }
    ];

    const typeSpecificFields = {
      encounters: [
        { value: 'encounter_class', label: 'Encounter Class', type: 'text' },
        { value: 'total_claim_cost', label: 'Total Cost', type: 'number' },
        { value: 'reason_description', label: 'Reason', type: 'text' }
      ],
      conditions: [
        { value: 'code', label: 'Condition Code', type: 'text' },
        { value: 'stop_date', label: 'Resolution Date', type: 'date' }
      ],
      allergies: [
        { value: 'code', label: 'Allergy Code', type: 'text' }
      ],
      careplans: [
        { value: 'stop_date', label: 'End Date', type: 'date' },
        { value: 'reason_description', label: 'Reason', type: 'text' }
      ],
      devices: [
        { value: 'code', label: 'Device Code', type: 'text' },
        { value: 'udi', label: 'UDI', type: 'text' }
      ]
    };

    return [...commonFields, ...(typeSpecificFields[type] || [])];
  };

  const addFilter = (field: string, operator: string, value: any) => {
    const fieldInfo = getAvailableFields(dataType).find(f => f.value === field);
    const newFilter: SearchFilter = {
      id: `${field}-${Date.now()}`,
      field,
      operator: operator as SearchFilter['operator'],
      value,
      label: `${fieldInfo?.label || field} ${operator} ${typeof value === 'object' ? `${value.start} to ${value.end}` : value}`
    };

    setFilters(prev => [...prev, newFilter]);
    setShowFilterBuilder(false);
  };

  const removeFilter = (filterId: string) => {
    setFilters(prev => prev.filter(f => f.id !== filterId));
  };

  const handleSearch = () => {
    onSearch(searchQuery, filters);
  };

  const handleClear = () => {
    setSearchQuery('');
    setFilters([]);
    onClear();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          Advanced Search
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Main search input */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={`Search ${dataType}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <Button 
            onClick={handleSearch} 
            disabled={isLoading}
            className="shrink-0"
          >
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
          <Button 
            variant="outline" 
            onClick={() => setShowFilterBuilder(!showFilterBuilder)}
            className="shrink-0"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Active filters */}
        {filters.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Active Filters:</span>
              <Button variant="ghost" size="sm" onClick={handleClear}>
                <X className="h-3 w-3 mr-1" />
                Clear All
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <Badge key={filter.id} variant="secondary" className="flex items-center gap-1">
                  <span className="text-xs">{filter.label}</span>
                  <X 
                    className="h-3 w-3 cursor-pointer hover:text-destructive" 
                    onClick={() => removeFilter(filter.id)}
                  />
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Filter builder */}
        {showFilterBuilder && (
          <div className="border rounded-lg p-4 space-y-4 bg-muted/20">
            <div className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span className="font-medium">Add Filter</span>
            </div>
            <FilterBuilder
              fields={getAvailableFields(dataType)}
              onAddFilter={addFilter}
            />
          </div>
        )}

        <Separator />

        {/* Quick filters */}
        <div className="space-y-2">
          <span className="text-sm font-medium">Quick Filters:</span>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => addFilter('start_date', 'date_range', { 
                start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], 
                end: new Date().toISOString().split('T')[0] 
              })}
            >
              <Calendar className="h-3 w-3 mr-1" />
              Last 7 days
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => addFilter('start_date', 'date_range', { 
                start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], 
                end: new Date().toISOString().split('T')[0] 
              })}
            >
              <Calendar className="h-3 w-3 mr-1" />
              Last 30 days
            </Button>
            {dataType === 'conditions' && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => addFilter('stop_date', 'equals', '')}
              >
                Active Only
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Filter builder component
interface FilterBuilderProps {
  fields: Array<{ value: string; label: string; type: string }>;
  onAddFilter: (field: string, operator: string, value: any) => void;
}

const FilterBuilder = ({ fields, onAddFilter }: FilterBuilderProps) => {
  const [selectedField, setSelectedField] = useState('');
  const [selectedOperator, setSelectedOperator] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const getOperators = (fieldType: string) => {
    switch (fieldType) {
      case 'text':
        return [
          { value: 'contains', label: 'Contains' },
          { value: 'equals', label: 'Equals' },
          { value: 'starts_with', label: 'Starts with' }
        ];
      case 'number':
        return [
          { value: 'equals', label: 'Equals' },
          { value: 'greater_than', label: 'Greater than' },
          { value: 'less_than', label: 'Less than' }
        ];
      case 'date':
        return [
          { value: 'date_range', label: 'Date range' },
          { value: 'equals', label: 'Exact date' }
        ];
      default:
        return [{ value: 'equals', label: 'Equals' }];
    }
  };

  const handleAddFilter = () => {
    if (!selectedField || !selectedOperator) return;

    const value = selectedOperator === 'date_range' ? dateRange : filterValue;
    onAddFilter(selectedField, selectedOperator, value);

    // Reset form
    setSelectedField('');
    setSelectedOperator('');
    setFilterValue('');
    setDateRange({ start: '', end: '' });
  };

  const selectedFieldInfo = fields.find(f => f.value === selectedField);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
      <Select value={selectedField} onValueChange={setSelectedField}>
        <SelectTrigger>
          <SelectValue placeholder="Select field" />
        </SelectTrigger>
        <SelectContent>
          {fields.map((field) => (
            <SelectItem key={field.value} value={field.value}>
              {field.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select 
        value={selectedOperator} 
        onValueChange={setSelectedOperator}
        disabled={!selectedField}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select operator" />
        </SelectTrigger>
        <SelectContent>
          {selectedFieldInfo && getOperators(selectedFieldInfo.type).map((op) => (
            <SelectItem key={op.value} value={op.value}>
              {op.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {selectedOperator === 'date_range' ? (
        <div className="flex gap-2">
          <Input
            type="date"
            value={dateRange.start}
            onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
            placeholder="Start date"
          />
          <Input
            type="date"
            value={dateRange.end}
            onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
            placeholder="End date"
          />
        </div>
      ) : (
        <Input
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          placeholder="Enter value"
          disabled={!selectedOperator}
          type={selectedFieldInfo?.type === 'number' ? 'number' : 'text'}
        />
      )}

      <Button 
        onClick={handleAddFilter}
        disabled={!selectedField || !selectedOperator || (!filterValue && selectedOperator !== 'date_range') || (selectedOperator === 'date_range' && (!dateRange.start || !dateRange.end))}
        className="w-full"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add
      </Button>
    </div>
  );
};

export default AdvancedSearch;
