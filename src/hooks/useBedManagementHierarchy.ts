
import { useState, useCallback } from 'react';
import { BedData } from '@/types/bedManagement';

export const useBedManagementHierarchy = (initialData: BedData[]) => {
  const [expandedRows, setExpandedRows] = useState<string[]>(
    initialData.filter(item => item.isExpanded).map(item => item.id)
  );

  const [filteredData, setFilteredData] = useState(initialData);

  const handleRowExpand = useCallback((id: string) => {
    setExpandedRows(prev => 
      prev.includes(id) 
        ? prev.filter(rowId => rowId !== id)
        : [...prev, id]
    );
  }, []);

  const getVisibleData = useCallback(() => {
    return filteredData.filter(item => {
      if (!item.parentId) return true;
      return expandedRows.includes(item.parentId);
    });
  }, [filteredData, expandedRows]);

  const expandToLevel = useCallback((level: 'organization' | 'hospital' | 'department' | 'ward' | 'room') => {
    const levelOrder = ['organization', 'hospital', 'department', 'ward', 'room'];
    const targetIndex = levelOrder.indexOf(level);
    
    const toExpand: string[] = [];
    
    filteredData.forEach(item => {
      const itemIndex = levelOrder.indexOf(item.level);
      if (itemIndex <= targetIndex && item.hasChildren) {
        toExpand.push(item.id);
      }
    });
    
    setExpandedRows(toExpand);
  }, [filteredData]);

  const collapseAll = useCallback(() => {
    setExpandedRows([]);
  }, []);

  const searchData = useCallback((searchTerm: string) => {
    if (!searchTerm.trim()) {
      setFilteredData(initialData);
      return;
    }

    const filtered = initialData.filter(item => 
      item.org.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.hospital.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.ward.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.arabicName && item.arabicName.includes(searchTerm))
    );

    setFilteredData(filtered);
    
    // Auto-expand parents of matching items
    const parentsToExpand: string[] = [];
    filtered.forEach(item => {
      if (item.parentId) {
        parentsToExpand.push(item.parentId);
      }
    });
    
    setExpandedRows(prev => [...new Set([...prev, ...parentsToExpand])]);
  }, [initialData]);

  return {
    expandedRows,
    visibleData: getVisibleData(),
    handleRowExpand,
    expandToLevel,
    collapseAll,
    searchData,
    filteredData
  };
};
