import { Icon } from '../Icon/Icon';
import { Button } from '../Button/Button';
import { SearchInput } from '../SearchInput/SearchInput';
import { SelectFilter } from '../SelectFilter/SelectFilter';
import { CardListRow } from '../CardListRow/CardListRow';
import { CardsListPagination } from './CardsListPagination';
import { SkeletonCard, EmptyState, ErrorState } from './CardsListStates';
import { CardsListProps } from './CardsList.props';

const gapClasses = {
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
};

export function CardsList({
  data,
  keyField = '_id',
  renderContent,
  actions,
  actionsMode = 'menu',
  onCardClick,
  cardVariant = 'default',
  cardPadding = 'md',

  search = {},
  filters = {},
  sort = {},

  statsContent,
  pagination = {},

  isLoading = false,
  error = '',
  onRetry,
  emptyMessage = 'No se encontraron resultados',
  emptyIcon = 'inbox',

  className = '',
  gap = 'md',
}) {
  const { enabled: searchable, value: searchValue, onChange: onSearchChange, placeholder: searchPlaceholder = 'Buscar...' } = search;
  const { items: filterItems = [], onChange: onFilterChange, onClear: onClearFilters, hasActive: hasActiveFilters } = filters;
  const { options: sortOptions = [], value: sortValue, onChange: onSortChange } = sort;
  const { page, totalPages, totalItems, onChange: onPageChange, itemsPerPage = 10, itemsPerPageOptions, onItemsPerPageChange } = pagination;

  const hasToolbar = searchable || filterItems.length > 0 || sortOptions.length > 0;
  const hasPagination = page != null && totalPages != null && totalItems != null && onPageChange;

  return (
    <div test-id="el-c4l1s7t8" className={className}>
      {statsContent}

      {hasToolbar && (
        <div className="flex flex-wrap items-center gap-3 mb-4">
          {searchable && (
            <SearchInput
              value={searchValue}
              onChange={onSearchChange}
              placeholder={searchPlaceholder}
              className="w-full sm:flex-1 sm:min-w-40"
            />
          )}
          {filterItems.map((filter) => (
            <SelectFilter
              key={filter.key}
              value={filter.value}
              onChange={(value) => onFilterChange(filter.key, value)}
              options={filter.options}
              placeholder={filter.placeholder}
              multiple={filter.multiple}
              className={filter.className}
            />
          ))}
          {hasActiveFilters && onClearFilters && (
            <Button variant="ghost" size="sm" onClick={onClearFilters}>
              <Icon name="filter_list_off" size="sm" className="mr-1" />
              Limpiar
            </Button>
          )}
          {sortOptions.length > 0 && (
            <>
              <div className="hidden sm:block h-6 border-l border-base-300" />
              <SelectFilter
                value={sortValue}
                onChange={onSortChange}
                options={sortOptions}
                placeholder="Ordenar por"
                className="sm:ml-auto"
              />
            </>
          )}
        </div>
      )}

      {error && <ErrorState error={error} onRetry={onRetry} />}

      {!error && isLoading && (
        <div className={`flex flex-col ${gapClasses[gap]}`}>
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {!error && !isLoading && data.length === 0 && (
        <EmptyState
          message={emptyMessage}
          icon={emptyIcon}
          hasActiveFilters={hasActiveFilters}
          onClearFilters={onClearFilters}
        />
      )}

      {!error && !isLoading && data.length > 0 && (
        <div className={`flex flex-col ${gapClasses[gap]}`}>
          {data.map((item, index) => {
            const rowActions = typeof actions === 'function' ? actions(item) : actions;
            const { title, badges, meta, content, className: cardClassName } = renderContent(item, index);
            return (
              <CardListRow
                key={item[keyField] || index}
                title={title}
                badges={badges}
                meta={meta}
                actions={rowActions}
                actionsMode={actionsMode}
                row={item}
                variant={cardVariant}
                padding={cardPadding}
                className={cardClassName}
                onClick={onCardClick ? () => onCardClick(item) : undefined}
              >
                {content}
              </CardListRow>
            );
          })}
        </div>
      )}

      {hasPagination && !isLoading && !error && data.length > 0 && (
        <CardsListPagination
          page={page}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          itemsPerPageOptions={itemsPerPageOptions}
          onPageChange={onPageChange}
          onItemsPerPageChange={onItemsPerPageChange}
        />
      )}
    </div>
  );
}

CardsList.propTypes = CardsListProps;
